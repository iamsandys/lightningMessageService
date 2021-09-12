# lightningMessageService
Make use of Lightning Message Service aka LMS to commuicate unrelated components in your application.

First create a message channel to pass/publish required data from one comonent to another.
Publish the selected accountId from allAccountsLms component.
Subsbcribe the message(accountId) in relatedContacts component and filter out the contacts.

Expose both components to HomePage to test it.
<isExposed>true</isExposed>
<targets>
    <target>lightning__HomePage</target>
</targets>
