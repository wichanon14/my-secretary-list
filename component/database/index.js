import * as SQLite from 'expo-sqlite';
import { RenderLedger } from '../central'

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
const error = (err)=>console.log('error >>>>');

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
                update_at INTEGER NOT NULL
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
                create_at INTEGER NOT NULL,
                update_at INTEGER NOT NULL
            );`,
            [],success('Ledger structure'),error
        );

        // Initial Task Template structure
        //tx.executeSql('DROP TABLE Template;;');
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Template(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                task INTEGER NOT NULL,
                template_type TEXT NOT NULL,
                frequency TEXT NOT NULL,
                create_at INTEGER NOT NULL,
                update_at INTEGER NOT NULL
            );`,
            [],success('Template structure'),error
        );

    },error,success)
    //showIndex(db,'Tasks');
    //showTable(db);
    return db;
}


// ==================================== Tasks ==================================================
export const AddMasterTask = (db,taskName,then) =>
{
    db.transaction((tx)=>{
        tx.executeSql(
            `INSERT INTO Task_Master(task_name,create_at,update_at) 
            VALUES(?,?,?);`,
            [taskName,Date.parse(new Date()),Date.parse(new Date())],
            then,then
        )
    },error,success)
}

export const AddTask = (db,data,dispatch) =>
{
    db.transaction(()=>{

        AddMasterTask(db,data.task_name,()=>{
            db.transaction((tx)=>{
                
                let sql =`INSERT INTO Tasks(date,task,create_at,update_at) 
                SELECT '${data.date}',id,${Date.parse(new Date())},${Date.parse(new Date())} 
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
        tx.executeSql(`
            SELECT Tasks.id as id,date,task_name,complete,Tasks.create_at,Tasks.update_at 
            FROM Tasks 
            INNER JOIN Task_Master ON Tasks.task = Task_Master.id
            WHERE date = ? 
            ORDER BY complete
        `, [date], 
            (_, { rows }) =>{

                console.log('data >>> ',JSON.parse(JSON.stringify(rows))._array)
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
                            
                            let sql = `UPDATE Tasks SET task=${task}, complete = ${data.complete}, update_at = ${Date.parse(new Date())} WHERE id = ${data.id}`;
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
                            
                            let sql = `UPDATE Tasks SET task=${task}, complete = ${data.complete}, update_at = ${Date.parse(new Date())} WHERE id = ${data.id}`;
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
            ( parent_id, title, "type", "level", value, "limit", includeCalculate, create_at, update_at)
            VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [ parent, data.title, data.type, data.level, data.value, data.limit, data.includeCalculate,
                Date.parse(new Date()), Date.parse(new Date()) ],
                ()=>{
                    GetAllLedger(db,dispatch);
                },error
        )
    })
}

export const GetAllLedger = (db,dispatch)=>
{
    db.transaction((tx)=>{
        tx.executeSql(
            `SELECT * FROM Ledger`,[],
            (_,{rows})=>{
                // top ledger 
                let result = JSON.parse(JSON.stringify(rows));
                if( result && result._array.length > 0)
                    RenderLedger(result._array,dispatch)

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
                Date.parse(new Date()) ,data.id ],
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

export const GetTemplate = (db,type,dispatch)=>{

    db.transaction((tx)=>{
        tx.executeSql(
            `SELECT * FROM Template WHERE type = ?`,[type],
            (_,{ rows })=>{
                console.log(JSON.stringify(rows));
            },error
        )
    })

}

export const AddTemplate = (db,data,dispatch)=>{

    AddMasterTask( db, data.task_name, (db,data,dispatch)=>{

        db.transaction((tx)=>{
            let sql = `INSERT INTO Template(task,template_type,frequency,create_at,update_at) 
            SELECT id,'${data.type}','${data.frequency}',${Date.parse(new Date())},${Date.parse(new Date())}
            FROM Task_Master 
            where task_name = '${data.task_name}' AND NOT EXISTS (
                SELECT 1 FROM Template WHERE task = Task_Master.id AND type = '${data.type}' 
            ); `;

            tx.executeSql(sql,[],(db,data,dispatch)=>{
                GetTemplate(db,data.type,dispatch);
            },error)
        })
        
    })

}

export const EditTemplate = (db,data)=>{}

export const DeleteTemplate = (db,data)=>{}