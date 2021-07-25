import * as SQLite from 'expo-sqlite';
import { RenderLedger, getDateFromWeeklyPeriod, toyyyyMMDD, getDateFromMonthlyPeriod  } from '../central'
import { setDailyTemplate, setWeeklyTemplate, setMonthlyTemplate, setProfileSetting } from '../action'

const db = {
    connection:{}
}

export const DatabaseReducer = (state = db, action )=>
{
    switch(action.type)
    {   
        case "SET_DATABASE_CONNECTION" : 
            return {
                ...state,
                connection:action.payload
            }
        default: return state;
    }
}

const success = (table_name)=>{}/*console.log(table_name,'success')*/;
const error = (err='',msg)=>console.log('error >>>>',err,msg);

const showIndex = (db,table_name) => 
{
    db.transaction((tx)=>{
        tx.executeSql(`PRAGMA index_list('${table_name}');`, [], 
            (_, { rows }) =>console.log(JSON.stringify(rows))
        );
    },error,success('index_list'))
}

const showTable = (db)=>
{
    console.log('show tables >>>> ');
    db.transaction((tx)=>{
        tx.executeSql(`SELECT 
            name
        FROM 
            sqlite_master 
        WHERE 
            type ='table' AND 
            name NOT LIKE 'sqlite_%';`, [],
            (_,{rows})=>console.log(JSON.stringify(rows))
        );
    },error,success('table_list'))
}

export const startDatabase = () =>
{
    const dbname = "my-secretary-list.db"
    const db = SQLite.openDatabase(dbname);

    // initial table
    db.transaction((tx)=>{

        // initial task master table
        //tx.executeSql('DROP TABLE Task_Master;');
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Task_Master (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                task_name TEXT UNIQUE NOT NULL,
                create_at INTEGER NOT NULL,
                update_at INTEGER NOT NULL
            );`,[],success('Task_Master'),error
        );

        // initial task list table
        //tx.executeSql('DROP TABLE Tasks;');
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Tasks(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL,
                task INTEGER NOT NULL,
                complete INTEGER DEFAULT 0,
                create_at INTEGER NOT NULL,
                update_at INTEGER NOT NULL,
                UNIQUE(date,task)
            );`,
            [],success('Tasks'),error
        );
        tx.executeSql(
            `CREATE INDEX IF NOT EXISTS date_index ON Tasks(date);`,
            [],success('date_index'),error
        );
        tx.executeSql(
            `CREATE INDEX IF NOT EXISTS task_index ON Tasks(task);`,
            [],success('task_index'),error
        );
        tx.executeSql(
            `CREATE INDEX IF NOT EXISTS complete_index ON Tasks(complete);`,
            [],success('complete_index'),error
        );

        // Initial Ledger structure
        //tx.executeSql('DROP TABLE Ledger;');
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Ledger (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                parent_id INTEGER,
                title TEXT NOT NULL,
                "type" INTEGER NOT NULL,
                "level" INTEGER NOT NULL,
                value FLOAT NOT NULL,
                "limit" FLOAT NOT NULL,
                includeCalculate INTEGER NOT NULL,
                target_date INTEGER NOT NULL,
                create_at INTEGER NOT NULL,
                update_at INTEGER NOT NULL
            );`,
            [],success('Ledger structure'),error
        );

        // Initial Task Template structure
        //tx.executeSql('DROP TABLE Template;');
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Template(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                task INTEGER NOT NULL,
                template_type TEXT NOT NULL,
                period TEXT NOT NULL,
                create_at INTEGER NOT NULL,
                update_at INTEGER NOT NULL
            );`,
            [],success('Template structure'),error
        );

        // Initial Profile Setting Structure
        //tx.executeSql('DROP TABLE ProfileSetting;');
        tx.executeSql(`
            CREATE TABLE IF NOT EXISTS ProfileSetting(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                key_value TEXT UNIQUE NOT NULL,
                value TEXT NULL,
                create_at INTEGER NOT NULL,
                update_at INTEGER NOT NULL
            );`,
            [],success('Profile Setting structure'),error
        );
        tx.executeSql(`
        INSERT OR REPLACE INTO ProfileSetting ( key_value, create_at, update_at) 
        VALUES 
            ( 'StartLedgerPeriod', strftime('%s','now')*1000, strftime('%s','now')*1000),
            ( 'FinishLedgerPeriod', strftime('%s','now')*1000, strftime('%s','now')*1000);
        `,[],success('Complete insert profile setting'),error)

    },error,success)
    //GetAllProfileSetting(db);
    //showIndex(db,'Tasks');
    //showTable(db);
    //GetMasterTask(db)
    return db;
}


// ==================================== Tasks ==================================================
export const AddMasterTask = (db,taskName,then) =>
{
    db.transaction((tx)=>{
        tx.executeSql(
            `INSERT INTO Task_Master(task_name,create_at,update_at) 
            VALUES(?,?,?);`,
            [taskName,Date.parse(new Date())+(7*3600*1000),Date.parse(new Date())+(7*3600*1000)],
            then,then
        )
    },error,success)
}

export const GetMasterTask = (db) =>
{
    db.transaction((tx)=>{

        // Fetch selected tasks
        tx.executeSql(`
            SELECT * FROM Task_Master;
        `, [], 
            (_, { rows }) =>{
                /*console.log('data >>> ',JSON.parse(JSON.stringify(rows))._array)*/
            }
        );
    },error,success)
}

export const AddTask = (db,data,dispatch) =>
{
    db.transaction(()=>{

        AddMasterTask(db,data.task_name,()=>{
            db.transaction((tx)=>{
                
                let sql =`INSERT INTO Tasks(date,task,create_at,update_at) 
                SELECT '${data.date}',id,${Date.parse(new Date())+(7*3600*1000)},${Date.parse(new Date())+(7*3600*1000)} 
                FROM Task_Master 
                where task_name = '${data.task_name}' AND NOT EXISTS (
                    SELECT 1 FROM Tasks WHERE task = Task_Master.id AND date = '${data.date}' 
                ); `

                tx.executeSql(
                    sql,
                    [],()=>{
                        // Auto Fetch new data
                        GetAllDailyTaskByDate(db,data.date,dispatch);
                    },error
                )
            })
        })

    },error,success)
}

export const GetAllDailyTaskByDate = (db,date,dispatch) =>
{
    db.transaction((tx)=>{

        // Fetch selected tasks
        let sql = `
            SELECT Tasks.id as id,date,task_name,complete,Tasks.create_at,Tasks.update_at 
            FROM Tasks 
            INNER JOIN Task_Master ON Tasks.task = Task_Master.id
            WHERE date = '${date}'
            ORDER BY complete
        `;
        tx.executeSql(sql, [], 
            (_, { rows }) =>{
                
                //console.log('rows >>> ',rows._array);

                dispatch({
                    type : "SET_TASK_LIST",
                    payload : JSON.parse(JSON.stringify(rows))._array
                })

            }
        );
    },error,success)
}

export const UpdateTask = (db,data,dispatch) =>
{
    let task = -1;

    db.transaction((tx)=>{

        tx.executeSql(
            `INSERT INTO Task_Master(task_name,create_at,update_at) 
            VALUES(?,?,?);`,
            [data.task_name,Date.parse(new Date()),Date.parse(new Date())],
            ()=>{
                db.transaction((tx)=>{
                    tx.executeSql(`
                        SELECT id FROM Task_Master
                        WHERE task_name = ?
                    `, [data.task_name], 
                        (_, { rows }) =>{
                            if(JSON.parse(JSON.stringify(rows))._array.length>0)
                                task = JSON.parse(JSON.stringify(rows))._array[0].id;
                            
                            let sql = `UPDATE Tasks SET task=${task}, complete = ${data.complete}, update_at = ${Date.parse(new Date())+(7*3600*1000)} WHERE id = ${data.id}`;
                            tx.executeSql(sql,[],success,error);
                            GetAllDailyTaskByDate(db,data.date,dispatch);

                        }
                    );
                })
            },()=>{
                db.transaction((tx)=>{
                    tx.executeSql(`
                        SELECT id FROM Task_Master
                        WHERE task_name = ?
                    `, [data.task_name], 
                        (_, { rows }) =>{
                            if(JSON.parse(JSON.stringify(rows))._array.length>0)
                                task = JSON.parse(JSON.stringify(rows))._array[0].id;
                            
                            let sql = `UPDATE Tasks SET task=${task}, complete = ${data.complete}, update_at = ${Date.parse(new Date())+(7*3600*1000)} WHERE id = ${data.id}`;
                            tx.executeSql(sql,[],success,error);
                            GetAllDailyTaskByDate(db,data.date,dispatch);

                        }
                    );
                })
            }
        )

    })

}

export const DeleteTask = (db,data,dispatch) =>
{
    db.transaction((tx)=>{
        tx.executeSql(
            `DELETE FROM Tasks WHERE id = ?`,
            [data.id],()=>{
                
                GetAllDailyTaskByDate(db,data.date,dispatch);

            },error
        )
    })
}


// ==================================== Ledger ==================================================
export const AddLedgerRow = (db,parent,data,dispatch) =>
{
    db.transaction((tx)=>{
        tx.executeSql(
            `INSERT INTO Ledger
            ( parent_id, title, "type", "level", value, "limit", includeCalculate, target_date, create_at, update_at) 
            VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );`,
            [ parent, data.title, data.type, data.level, data.value, data.limit, data.includeCalculate, data.targetDate, Date.parse(new Date())+(7*3600*1000), Date.parse(new Date())+(7*3600*1000) ],
                ()=>{
                    GetAllLedger(db,dispatch);
                },error
        )
    })
}

export const GetAllLedger = (db,dispatch)=>
{
    db.transaction((tx)=>{
        
        let whereCause = '';        
        tx.executeSql(
            `SELECT * FROM ProfileSetting`,[],(_,{rows})=>{
                let start = rows._array.filter((val,i)=>val.key_value==='StartLedgerPeriod')[0]
                let finish = rows._array.filter((val,i)=>val.key_value==='FinishLedgerPeriod')[0]
                if( start && finish && start.value && finish.value )
                    whereCause = `WHERE ( target_date >= ${ start.value } AND target_date <= ${ finish.value } ) OR parent_id is null`;
                //whereCause='';
                let sql = `SELECT * FROM Ledger ${whereCause}`;
                tx.executeSql(
                    sql,[],
                    (_,{rows})=>{
                        // top ledger 

                        let result = JSON.parse(JSON.stringify(rows));
                        if( result && result._array.length > 0)
                            RenderLedger(result._array,dispatch)
        
                    },error
                )

            },error
        )

        
    })
}

export const UpdateLedgerRow = (db,parent,data,dispatch) =>
{
    db.transaction((tx)=>{
        tx.executeSql(
            `UPDATE Ledger
            SET parent_id=?, title=?, "type"=?, "level"=?, value=?, "limit"=?, includeCalculate=?, 
            update_at=? WHERE id=?;
            `,[ parent, data.title, data.type, data.level, data.value, data.limit, data.includeCalculate, 
                Date.parse(new Date())+(7*3600*1000) ,data.id ],
                ()=>{
                    GetAllLedger(db,dispatch);
                },error
        )
    })
}

export const DeleteLedgerRow = (db,data,dispatch) =>
{
    db.transaction((tx)=>{

        tx.executeSql(
            `DELETE FROM Ledger WHERE parent_id=?;`,[data.id],success,error
        )

        tx.executeSql(
            `DELETE FROM Ledger WHERE id=?;`,[data.id],
            ()=>{
                GetAllLedger(db,dispatch);
            },error
        )
    })
}



// ==================================== Template ==================================================

export const GetTemplate = (db,type,dispatch,setShow)=>{

    db.transaction((tx)=>{

        tx.executeSql(
            `SELECT Template.*, Task_Master.task_name 
            FROM Template 
            INNER JOIN Task_Master on Template.task = Task_Master.id 
            WHERE template_type = ?`,[type],
            (_,{ rows })=>{

                if( setShow )
                    setShow(false)
                    
                if(rows && rows._array )
                {
                    switch(type)
                    {
                        case 'daily': dispatch(setDailyTemplate(rows._array)); break;
                        case 'weekly': dispatch(setWeeklyTemplate(rows._array)); break;
                        case 'monthly': dispatch(setMonthlyTemplate(rows._array)); break;
                        default : break;
                    }
                }
            },error
        )
    })

}

export const AddTemplate = (db,data,dispatch,setShow)=>{

    db.transaction(()=>{

        AddMasterTask( db, data.task_name, ()=>{

            db.transaction((tx)=>{
                let sql = `INSERT INTO Template(task,template_type,period,create_at,update_at) 
                SELECT id,'${data.type}','${data.period}',${Date.parse(new Date())+(7*3600*1000)},${Date.parse(new Date())+(7*3600*1000)}
                FROM Task_Master 
                where task_name = '${data.task_name}' AND NOT EXISTS (
                    SELECT 1 FROM Template WHERE task = Task_Master.id AND template_type = '${data.type}' 
                ); `;

                tx.executeSql(sql,[],()=>{
                    GetTemplate(db,data.type,dispatch,setShow);
                },error)
            })
            
        })
    })

}

export const EditTemplate = (db,data,dispatch,setShow)=>
{
    db.transaction(()=>{

        AddMasterTask( db, data.task_name, ()=>{

            db.transaction((tx)=>{
                let sql = `SELECT id FROM Task_Master WHERE task_name = '${data.task_name}'`;
                tx.executeSql(sql,[],(_,{rows})=>{
                    
                    if(rows._array && rows._array.length > 0)
                    {
                        let id = rows._array[0].id;
                        db.transaction((tx)=>{
                            let sql = `UPDATE Template SET task=${id}, period = '${data.period}', update_at=${Date.parse(new Date())+(7*3600*1000)} WHERE id = ${data.id}`;
                            tx.executeSql(sql,[],()=>{
                                GetTemplate(db,data.template_type,dispatch,setShow);
                            })
                        })
                    }

                },error)
            })
            
        })
    })
}

export const DeleteTemplate = (db,data,dispatch,setShow)=>
{
    db.transaction((tx)=>{
        let sql = `DELETE FROM Template WHERE id = ${data.id}`;
        tx.executeSql(sql,[],()=>{
            GetTemplate(db,data.template_type,dispatch,setShow);
        },error);
    })
}


export const GenerateTemplate = (db,dateSelected,dispatch) =>
{
    db.transaction((tx)=>{

        let sql =`INSERT OR REPLACE INTO Tasks(date,task,create_at,update_at) 
                SELECT '${toyyyyMMDD(dateSelected)}',task,${Date.parse(new Date())+(7*3600*1000)},${Date.parse(new Date())+(7*3600*1000)} 
                FROM Template 
                where template_type = 'daily'`;
        tx.executeSql(sql,[],()=>{
            GetAllDailyTaskByDate(db,toyyyyMMDD(dateSelected),dispatch);
        },error)

        sql = `SELECT * FROM Template WHERE template_type IN ('weekly','monthly')`;
        tx.executeSql(sql,[],(_,{rows})=>{
            let data = rows._array;
            if(data && data.length>0)
            {
                WeeklyTemplateGenerate(db,dateSelected,data,dispatch);
            }
        },error)

    })
}

const WeeklyTemplateGenerate = (db,dateSelected,data,dispatch) =>
{
    db.transaction((tx)=>{

        if( data && data.length > 0 )
        {
            let weekObj = data.filter(val=>val.template_type==='weekly')
            weekObj.forEach((val,i)=>{

                let result = getDateFromWeeklyPeriod(dateSelected,val);
                let sqlList = [];

                if( result && result.length > 0 )
                {
                    result.forEach(dateResult=>{
                        let sql =`INSERT OR REPLACE INTO Tasks(date,task,create_at,update_at) 
                        SELECT '${dateResult}',task,${Date.parse(new Date())+(7*3600*1000)},${Date.parse(new Date())+(7*3600*1000)} 
                        FROM Template 
                        where Template.id = ${val.id}`;
                        sqlList.push(sql);
                    })
                    chainSql(db,sqlList,0);
                }
                
            })

            MonthlyTemplateGenerate(db,dateSelected,data,dispatch);
        }
    })
}

const MonthlyTemplateGenerate = (db,dateSelected,data,dispatch) =>
{
    if( data && data.length > 0 )
    {
        let monthlyObj = data.filter(val=>val.template_type==='monthly')
        monthlyObj.forEach((val,i)=>{

            let result = getDateFromMonthlyPeriod(dateSelected,val);
            let sqlList = [];
            console.log(`${i} >> `,result );

            if( result && result.length > 0 )
            {
                result.forEach(dateResult=>{
                    let sql =`INSERT OR REPLACE INTO Tasks(date,task,create_at,update_at) 
                    SELECT '${dateResult}',task,${Date.parse(new Date())+(7*3600*1000)},${Date.parse(new Date())+(7*3600*1000)} 
                    FROM Template 
                    where Template.id = ${val.id}`;
                    console.log(sql);
                    sqlList.push(sql);
                })
                chainSql(db,sqlList,0,`Generate Template Monthly`);
                GetAllDailyTaskByDate(db,toyyyyMMDD(dateSelected),dispatch);
            }
            
        })
    }
}

const chainSql = (db,sqlList,i,errorMsg='')=>
{
    if(i<sqlList.length)
    {
        db.transaction((tx)=>{
            tx.executeSql(sqlList[i],[],()=>{
                chainSql(db,sqlList,i+1)
            },console.log(errorMsg))
        })
    }
}

// ==================================== Profile Setting ===========================================
export const GetAllProfileSetting = (db,dispatch) =>
{
    db.transaction((tx)=>
    {
        let sql = `SELECT * FROM ProfileSetting`;
        tx.executeSql(sql,[],(_,{rows})=>{
            let result = {}
            if( rows && rows._array )
            {
                rows._array.forEach((val,i) => {
                    result[val.key_value] = JSON.parse(val.value);
                });
            }

            if(dispatch)
            {
                dispatch(setProfileSetting(result));
                GetAllLedger(db,dispatch);
            }

        },error);
    })
}

export const UpdateProfileSetting = (db,key,value,dispatch) =>
{
    db.transaction((tx)=>
    {
        let sql = `UPDATE ProfileSetting set value = '${value}' WHERE key_value = '${key}'`;
        tx.executeSql(sql,[],()=>GetAllProfileSetting(db,dispatch),error)
    })
}