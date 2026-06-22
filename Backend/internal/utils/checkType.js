/**
 @param {Array} values チェックする値の配列
 @param {Array} types  チェックする値に対応する型(文字列)の配列

 #### (返り値がtrueの例)
 ```
  arrayCheckType([1,"string", [1, 2, 3], {object: "object"}], ["number", "string", "object", "object"])
 ```
 #### (返り値がfalseの例)
 ```
 arrayCheckType([1,"string"], ["string", "number"]);
 ```
*/
export function arrayCheckType(values, types){
    if(typeof values != "object"){
        throw new Error("values must be Array")
    }
    if(typeof types != "object"){
        throw new Error("types must be Array")
    }

    const result = values.filter((value, index) => {
        return typeof value != types[index]
    });
    
    if (result.length != 0){
         return false;
    } else {
        return true;
    }
}