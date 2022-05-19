import {} from './entities/Account';
import Account from './models/Account';

export async function Confirm(formContext: Xrm.FormContext){
    const id = formContext.data.entity.getId();
    const name = formContext.getAttribute(Account.Fields.Name).getValue();
    const confirmStrings: Xrm.Navigation.ConfirmStrings ={
        text : `${id}: ${name}`,
        title: "Confirm"
    };
    let result = await Xrm.Navigation.openConfirmDialog(confirmStrings);
    if(result.confirmed){
        alert("confirmed");
    }
    else{
        alert("canceled");
    }
}
export function SetCreditHold(formContext: Xrm.FormContext){
    formContext.getAttribute<Xrm.Attributes.BooleanAttribute>(Account.Fields.CreditOnHold).setValue(true);
    formContext.ui.setFormNotification("Set Credit Hold on Account", XrmEnum.FormNotificationLevel.Info, "credithold");
    setTimeout(() => {
        formContext.ui.clearFormNotification("credithold");
    }, 5000);
    
    formContext.data.save();
}
