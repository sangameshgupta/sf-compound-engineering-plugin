---
name: lwc-patterns
description: Lightning Web Components patterns for state management, component communication, and architecture
scope: LWC_ONLY
---

# LWC Design Patterns

**SCOPE: LWC_ONLY** - This skill applies ONLY to Lightning Web Components (JavaScript, HTML, CSS).
**DO NOT** use this skill for Flows or backend Apex logic. For Apex patterns, use `apex-patterns`. For Flow patterns, use `flow-patterns`.

---

Common patterns for building maintainable Lightning Web Components.

## Component Communication

### Parent to Child (Props)

```javascript
// Parent component
// parent.html
<template>
    <c-child-component 
        account-id={accountId}
        is-editable={isEditable}
        onupdate={handleChildUpdate}>
    </c-child-component>
</template>

// parent.js
import { LightningElement } from 'lwc';

export default class Parent extends LightningElement {
    accountId = '001xx000003DGXXX';
    isEditable = true;
    
    handleChildUpdate(event) {
        console.log('Child updated:', event.detail);
    }
}
```

```javascript
// Child component
// child.js
import { LightningElement, api } from 'lwc';

export default class Child extends LightningElement {
    @api accountId;
    @api isEditable;
    
    handleClick() {
        this.dispatchEvent(new CustomEvent('update', {
            detail: { accountId: this.accountId }
        }));
    }
}
```

### Child to Parent (Events)

```javascript
// child.js
handleSave() {
    const saveEvent = new CustomEvent('save', {
        detail: { 
            data: this.formData,
            timestamp: Date.now()
        },
        bubbles: false,
        composed: false
    });
    this.dispatchEvent(saveEvent);
}
```

### Sibling Communication (Pub/Sub)

```javascript
// pubsub.js - Shared module
const events = new Map();

export const subscribe = (eventName, callback) => {
    if (!events.has(eventName)) {
        events.set(eventName, new Set());
    }
    events.get(eventName).add(callback);
    return () => events.get(eventName).delete(callback);
};

export const publish = (eventName, payload) => {
    if (events.has(eventName)) {
        events.get(eventName).forEach(callback => callback(payload));
    }
};
```

```javascript
// publisher.js
import { publish } from 'c/pubsub';

handleFilterChange() {
    publish('filterChanged', { industry: this.selectedIndustry });
}
```

```javascript
// subscriber.js
import { LightningElement } from 'lwc';
import { subscribe } from 'c/pubsub';

export default class Subscriber extends LightningElement {
    unsubscribe;
    
    connectedCallback() {
        this.unsubscribe = subscribe('filterChanged', this.handleFilter.bind(this));
    }
    
    disconnectedCallback() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
    
    handleFilter(payload) {
        this.industry = payload.industry;
        this.refreshData();
    }
}
```

### Lightning Message Service

```javascript
// Using Lightning Message Service for cross-DOM communication
import { LightningElement, wire } from 'lwc';
import { publish, subscribe, MessageContext } from 'lightning/messageService';
import ACCOUNT_SELECTED from '@salesforce/messageChannel/AccountSelected__c';

export default class Publisher extends LightningElement {
    @wire(MessageContext)
    messageContext;
    
    handleAccountSelect(event) {
        const payload = { accountId: event.target.dataset.id };
        publish(this.messageContext, ACCOUNT_SELECTED, payload);
    }
}
```

```javascript
// Subscriber
import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import ACCOUNT_SELECTED from '@salesforce/messageChannel/AccountSelected__c';

export default class Subscriber extends LightningElement {
    @wire(MessageContext)
    messageContext;
    
    subscription = null;
    
    connectedCallback() {
        this.subscription = subscribe(
            this.messageContext,
            ACCOUNT_SELECTED,
            (message) => this.handleMessage(message)
        );
    }
    
    handleMessage(message) {
        this.selectedAccountId = message.accountId;
    }
}
```

## State Management

### Reactive Properties

```javascript
import { LightningElement, track } from 'lwc';

export default class StateExample extends LightningElement {
    // Primitive - reactive by default
    count = 0;
    
    // Object - use @track for deep reactivity (or reassign)
    @track formData = {
        name: '',
        email: ''
    };
    
    // Array - reassign for reactivity
    items = [];
    
    incrementCount() {
        this.count++; // Triggers re-render
    }
    
    updateName(event) {
        this.formData.name = event.target.value; // Works with @track
    }
    
    addItem(item) {
        // Create new array to trigger reactivity
        this.items = [...this.items, item];
    }
    
    removeItem(index) {
        this.items = this.items.filter((_, i) => i !== index);
    }
}
```

### Container/Presenter Pattern

```javascript
// Container - handles data and logic
// accountListContainer.js
import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class AccountListContainer extends LightningElement {
    @wire(getAccounts)
    accounts;
    
    handleSelect(event) {
        // Business logic
        this.navigateToRecord(event.detail.accountId);
    }
}
```

```html
<!-- accountListContainer.html -->
<template>
    <c-account-list
        accounts={accounts.data}
        onselect={handleSelect}>
    </c-account-list>
</template>
```

```javascript
// Presenter - pure UI component
// accountList.js
import { LightningElement, api } from 'lwc';

export default class AccountList extends LightningElement {
    @api accounts = [];
    
    handleClick(event) {
        this.dispatchEvent(new CustomEvent('select', {
            detail: { accountId: event.currentTarget.dataset.id }
        }));
    }
}
```

## Data Fetching Patterns

### Choosing Apex vs GraphQL vs uiRecordApi

Before writing any data-access code, pick the right tool. Default to **GraphQL** for read-mostly UI work over standard sObjects; reach for **Apex** when business logic, cross-system access, or elevated-permission reads are needed.

| Need | Recommend | Why |
|---|---|---|
| Read records the user can already see | **GraphQL** (`lightning/graphql` or `lightning/uiGraphQLApi`) | LDS-cached, FLS-enforced, one round trip for nested data, client picks fields |
| Parent + multiple child related lists in one call | **GraphQL** | Single round trip beats 3 SOQL or 3 wires |
| Single-record Create / Update / Delete | **`executeMutation`** (GraphQL) *or* **`uiRecordApi`** | Both participate in LDS cache |
| Bulk DML, complex validation, transformations | **Apex `@AuraEnabled`** | GraphQL mutations are single-record |
| Aggregations, GROUP BY, semi-joins, formulas not in UI API | **Apex (SOQL)** | GraphQL `where` is a tiny subset of SOQL |
| Reading **metadata** (Custom Metadata Types, Custom Settings) for users without that permission | **Apex** | See gotcha below |
| Callouts, async (Queueable/Batch), file manipulation | **Apex** | UI API has no equivalents |

> **⚠️ Metadata access permission gotcha**: Apex *bridges* permissions — an `@AuraEnabled` method can read Custom Metadata Types without the running user having direct permset access. GraphQL **does not bridge** — it runs the user's session against UI API directly. If you migrate Custom Metadata Type or Custom Settings reads to GraphQL, **every end user must be assigned a permission set granting Read on those metadata objects**, otherwise the query returns empty data silently (no error, no toast). Audit FLS and CRUD for every running profile before shipping a GraphQL migration of metadata reads.

For full GraphQL syntax, mutations, refresh patterns, error handling, and the metadata-permission deep-dive, use the **`graphql-patterns`** skill.

### Wire Service

```javascript
import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class WireExample extends LightningElement {
    // Wire to property
    @wire(getAccounts)
    accounts;
    
    // Wire to function for more control
    @wire(getAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }
}
```

### Imperative Apex

```javascript
import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class ImperativeExample extends LightningElement {
    accounts;
    isLoading = false;
    error;
    
    async connectedCallback() {
        await this.loadAccounts();
    }
    
    async loadAccounts() {
        this.isLoading = true;
        try {
            this.accounts = await getAccounts();
            this.error = undefined;
        } catch (error) {
            this.error = error;
            this.accounts = undefined;
        } finally {
            this.isLoading = false;
        }
    }
    
    async handleRefresh() {
        await this.loadAccounts();
    }
}
```

## Composition with Slots

```html
<!-- Base card component -->
<!-- baseCard.html -->
<template>
    <article class="slds-card">
        <header class="slds-card__header">
            <slot name="header">
                <h2>Default Header</h2>
            </slot>
        </header>
        <div class="slds-card__body">
            <slot></slot>
        </div>
        <footer class="slds-card__footer">
            <slot name="footer"></slot>
        </footer>
    </article>
</template>
```

```html
<!-- Usage -->
<c-base-card>
    <span slot="header">
        <lightning-icon icon-name="standard:account"></lightning-icon>
        Account Details
    </span>
    
    <!-- Default slot content -->
    <p>Account information goes here</p>
    
    <div slot="footer">
        <lightning-button label="Save" onclick={handleSave}></lightning-button>
    </div>
</c-base-card>
```

## Error Handling Pattern

```javascript
import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ErrorHandling extends LightningElement {
    async handleAction() {
        try {
            await this.performAction();
            this.showToast('Success', 'Operation completed', 'success');
        } catch (error) {
            this.handleError(error);
        }
    }
    
    handleError(error) {
        let message = 'An unknown error occurred';
        
        if (error.body && error.body.message) {
            message = error.body.message;
        } else if (error.message) {
            message = error.message;
        }
        
        this.showToast('Error', message, 'error');
        console.error('Error:', JSON.stringify(error));
    }
    
    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant
        }));
    }
}
```
