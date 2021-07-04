import { ToastAndroid } from 'react-native';

export const toyyyyMMDD = (date) =>
{
    let year = date.getFullYear();
    let month = (date.getMonth()<9)?'0'+(date.getMonth()+1):(date.getMonth()+1);
    let day = (date.getDate()<10)?'0'+date.getDate():date.getDate();
    return year+'-'+month+'-'+day
}

export const ValidFloatNumber = (input) =>
{
    let amount=-1;

    amount = parseFloat(input);

    if( amount.toString() === "NaN" )
        return false;

    return amount;
}

export const sumValueFromChild = (parent)=>
{
    let sum = 0;
    if( parent && parent.child && parent.child.length > 0 )
    {
        parent.child.forEach((val)=>{
            sum += val.value
        })
    }
    parent.value = sum;
    return sum;
}