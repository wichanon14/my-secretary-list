import * as SQLite from 'expo-sqlite';

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

    },error,success)
    //showIndex(db,'Tasks');
    return db;
}

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