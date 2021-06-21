
export const getDayAbbr = (day) =>
{

    switch(day)
    {
        case 0: return 'Sun';
        case 1: return 'Mon';
        case 2: return 'Tue';
        case 3: return 'Wed';
        case 4: return 'Thu';
        case 5: return 'Fri';
        case 6: return 'Sat';
        default : return ''
    }

}

export const getMonthName = (month) =>
{
    switch(month)
    {
        case 0: return 'January';
        case 1: return 'Febuary';
        case 2: return 'March';
        case 3: return 'April';
        case 4: return 'May';
        case 5: return 'June';
        case 6: return 'July';
        case 7: return 'August';
        case 8: return 'September';
        case 9: return 'October';
        case 10: return 'November';
        case 11: return 'December';
        default :
            return '';
    }
}