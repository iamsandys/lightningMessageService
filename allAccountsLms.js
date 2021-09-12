import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/LMSController.getAccounts';
import { publish, MessageContext } from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/BoatMessageChannel__c';

const columns = [
    {label:'Name', fieldName:'Name', type:'text'},
    {label:'Industry', fieldName:'Industry', type:'text'},
    {label:'Account Number', fieldName:'AccountNumber', type:'number'},
    {label:'Rating', fieldName:'Rating', type:'text'}
];

export default class AllAccountsLms extends LightningElement {
    accountColumns = columns;
    accounts = [];

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        this.getAccountOnLoad();
    }

    getAccountOnLoad(){
        getAccounts()
        .then(result => {
            this.accounts = result;
            this.error = undefined;
        })
        .catch(error =>{
            this.accounts = undefined;
            this.error = error.body.message;
        })
    }

    handleRowSelection(event){
        const row = event.detail.selectedRows;
        console.log({'rowId' : row[0].Id});
        this.sendAccountIdLMS(row[0].Id);
    }

    sendAccountIdLMS(accountId){
        const paylaod = {recordId : accountId};
        publish(this.messageContext, recordSelected, paylaod);
    }
}
