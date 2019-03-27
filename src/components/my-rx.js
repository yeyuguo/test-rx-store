import {
    Subject,
    BehaviorSubject,
    ReplaySubject,
    combineLatest,
    race,
    forkJoin,
    of,
    from,
    interval,
    Scheduler,
    throwError
} from "rxjs";
import {
    tap,
    scan,
    map,
    switchMap,
    share,
    catchError,
    mergeMap
} from "rxjs/operators";

/**
             store
             /       
new action /________    
          |         |
          |         |
        action     other action
  */
const store$ = new Subject();

const newStore$ = store$.pipe(
    map(data => {
        return data
    })
)

// !顶层的 store start
// store$.subscribe(data => {
//   console.log("顶层的 store ", data);
// });

// !顶层的 store end

const btnObs$ = new Subject();

// todo 可以做 事件异常处理 start
const handle_btnObs$ = btnObs$.pipe(
    // map(data => {
    //     console.log("btn 自己的事件处理 ", data);
    //     if (!data.status) {
    //         return throwError("参数错误");
    //     }
    //     return 'green'
    // }),
    mergeMap(data => {
        console.log('data: ', data);
        if (!data.status) {
            return throwError("错误拉");
        }
        return of('green')
    }),
    catchError(error => {
        // todo
        console.log("error: ", error);
        return of('red')
    })
);

// todo 可以做事件异常处理 end

//!事件 被上层store 监听 start
handle_btnObs$
    .pipe(
        map(data => {
            console.log("btn 自己的事件处理 ", data);
            return data
        })
    )
    .subscribe(store$);

//!事件 被上层store 监听 end




// !和它相关的 ui 处理 start (新的 分流)
const newUIObs$ = handle_btnObs$.pipe(
    map(data => {
        console.log('其他和此事件有关系的 ui 数据: ', data);
        return data
    })
)

// newUIObs$.subscribe(data => {
//   console.log('其他和此事件有关系的 UI 事件处理: ', data);
// })
// !和它相关的 ui 处理 end  (新的 分流)




export { btnObs$, handle_btnObs$, store$, newUIObs$ };
