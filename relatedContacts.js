import { LightningElement, wire, track } from 'lwc';
import getRelatedContacts from '@salesforce/apex/LMSController.getRelatedContacts';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/BoatMessageChannel__c';

export default class RelatedContacts extends LightningElement {

    subscription = null;
    accountId = '';

    @wire(MessageContext)
    messageContext;

    @wire(getRelatedContacts, {accountId : '$accountId'})
    contacts;

    subscribeTheMC(){
        if(!this.subscription){
            this.subscription = subscribe(
                this.messageContext,
                recordSelected,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    handleMessage(message){
        console.log('accountId from LMS :'+message.recordId);
        this.accountId = message.recordId;
    }

    unsubscribeTheMC(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    connectedCallback(){
        this.subscribeTheMC();
    }
    disconnectedCallback(){
        this.unsubscribeTheMC();
    }
    
    get recordsToshow(){
        console.log(this.contacts.data);
        let tempContacts = this.contacts.data;
        return ( tempContacts && tempContacts.length > 0 ) ? true : false;
    }
}
