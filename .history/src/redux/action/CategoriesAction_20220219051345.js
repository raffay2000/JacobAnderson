import {
    CATEGORIES_LOAD,
    CATEGORIES_LOAD_FAILED,
    CATEGORIES_LOAD_SUCCESS,
} from "../constants";
import { API } from "../MainURL";

var axios = require('axios');


export const LoadCategories = () => {
    return (dispatch) => {
        dispatch({type: CATEGORIES_LOAD});
            var config = {
            method: 'get',
            url:API+'get-categories',
        };

        axios(config)
        .then(function (response) {
            if(response.data.success){
                dispatch({type: CATEGORIES_LOAD_SUCCESS, payload: response.data.data});
            }
            else{
                dispatch({type: CATEGORIES_LOAD_FAILED, error:"Can't Load Categories"});
            }
        })
        .catch(function (error) {
            dispatch({type: CATEGORIES_LOAD_FAILED, error:"Something Went Wrong"});
            console.log(error);
        });
       
    }
}
