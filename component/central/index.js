import { ToastAndroid } from 'react-native';
import { setLedgerComponent } from '../action';

export const toyyyyMMDD = (date,noAddMonth=false) =>
{
    let year = date.getFullYear();
    let month = (date.getMonth()<9)?'0'+(date.getMonth()+1):(date.getMonth()+1);
    let day = (date.getDate()<10)?'0'+date.getDate():date.getDate();

    return year+'-'+month+'-'+day
}

export const toDaysAbbr = (day_of_week)=>
{
    switch(day_of_week)
    {
        case 1: return 'S';
        case 2: return 'M';
        case 3: return 'T';
        case 4: return 'W';
        case 5: return 'Th';
        case 6: return 'F';
        case 7: return 'Sa';
        default : return '';
    }
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

export const RenderLedger = (lists,dispatch) =>
{
    const topComponent = lists.filter((val,i)=>val.parent_id === null);
    
    let component = topComponent[0];

    let child = lists.filter((val,i)=>val.parent_id===component.id);
    if(child.length>0)
    {
        component.child = child;

        for( let i =0; i<component.child.length; i++)
        {
            renderInnerComponent(component.child[i],lists)
        }
        
    }
    else
    {
        component.child = [];
    }
        

    Recalculate(component);

    dispatch(setLedgerComponent(component));
}

const renderInnerComponent = (component,lists)=>
{
    component.child = lists.filter((val,i)=>val.parent_id===component.id)

    for( let i =0;i<component.child.length;i++)
    {
        renderInnerComponent(component.child[i],lists)
    }

}

const Recalculate = (parent)=>
{
    if( parent && parent.child && parent.child.length > 0)
    {
        parent.child.forEach((val)=>{
            Recalculate(val);
        })
        if(parent.type === 3)
        {
            sumValueFromChild(parent)
        }
    }
}


export const getDateFromWeeklyPeriod = (dateSelected,weekobj) =>
{
    let currentDate = Date.parse(dateSelected);
    let day = (new Date(currentDate)).getDay()+1;
    let period = JSON.parse(weekobj.period);
    let result = []
    period = period.filter((val)=>val.day>=day)
    
    for( let i=0; i<period.length ; i++ )
    {
        let diffDay = period[i].day - day;
        if(diffDay>0)
        {
            let diffMs = currentDate+(diffDay*(24*3600*1000));
            result.push( toyyyyMMDD(new Date(diffMs)) )
        }
    }

    return result;
}

export const getDateFromMonthlyPeriod = (dateSelected,monthobj) =>
{
    let period = JSON.parse(monthobj.period)
    let month = dateSelected.getMonth();
    let result = [];
    
    if(period && period.length > 0)
    {
        // week 
        if( period[0].week )
        {
            for(let i=0;i<period.length;i++)
            {
                let dateOfMonth = 1,dateFindWeek ;

                for(let w=1;w<=4;w++)
                {
                    if( w === period[i].week )
                    {
                        dateFindWeek = new Date(toyyyyMMDD(new Date(dateSelected.getFullYear(),month,dateOfMonth,0,0,0,0)));
                        let diffDate = period[i].day - dateFindWeek.getDay()-1;
                        let diffMs = Date.parse(dateFindWeek);
                        diffMs = diffMs+(diffDate*24*3600*1000)
                        dateFindWeek = new Date(diffMs);
                        if( dateFindWeek > dateSelected)
                        {
                            result.push(toyyyyMMDD(dateFindWeek,true))
                        }
                        break;
                    }
                    dateOfMonth += 7;
                }
            }
        }
        // date
        else
        {
            for(let i=0;i<period.length;i++)
            {
                let dateOfMonth = period[i].date;
                let dateGenerate = new Date(toyyyyMMDD(new Date(dateSelected.getFullYear(),month,dateOfMonth,0,0,0,0)));    
                if( dateGenerate > dateSelected)
                {
                    result.push(toyyyyMMDD(dateGenerate,true))    
                }        
            }
        }
        return result;
    }
}