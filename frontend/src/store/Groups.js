import { csrfFetch } from "./csrf"

const GET_ALL_GROUPS = "groups/GET_ALL_GROUPS"
const GET_ALL_USER_GROUPS = "groups/GET_ALL_USER_GROUPS"
const GET_GROUP_DETAILS = "groups/GET_GROUP_DETAILS"

export const getAllGroups = (groups) => ({
    type: GET_ALL_GROUPS,
    groups
})

export const getGroupDetails = (group) => ({
    type: GET_GROUP_DETAILS,
    group
})

export const getAllUserGroups = (groups) => ({
    type: GET_ALL_USER_GROUPS,
    groups
})

export const getAllGroupsThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/groups")

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllGroups(data.Groups))
        return data.Groups;
    }
}

export const getCurrentUserGroupsThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/session/groups")

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllUserGroups(data.Groups))
        return data.Groups;
    }
}

export const getGroupByIdThunk = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`)

    const data = await response.json();
    if (response.ok) {

        dispatch(getGroupDetails(data))
        return data;
    } else {
        return data;
    }
}

export const createAGroupThunk = (newGroup) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGroup)
    })

    const data = await response.json();
    if (response.ok) {
        const returnData = await dispatch(getGroupByIdThunk(data.id))
        return returnData;
    } else {
        return data;
    }


}

export const editAGroupThunk = (editedGroup, groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedGroup)
    })

    const data = await response.json();
    if (response.ok) {
        const returnData = await dispatch(getGroupByIdThunk(data.id))
        return returnData;
    } else {
        return data;
    }
}

export const deleteAGroupThunk = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`,{
        method: "DELETE"
    })

    const data = await response.json();
    if (response.ok) {
        await dispatch(getAllGroupsThunk())
    }
    return data;
}

const initialState = {
    groupsList: {},
    groupDetails: {},
    userGroups: {}
}

const groupsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_USER_GROUPS:
            newState = {...state, userGroups: action.groups}
            return newState;
        case GET_GROUP_DETAILS:
            newState = {...state, groupDetails: action.group}
            return newState;
        case GET_ALL_GROUPS:
            const groupsObj = {};
            action.groups.forEach(group => {
                groupsObj[group.id] = group
            });
            newState = { ...state, groupsList: groupsObj }
            return newState;
        default:
            return state;
    }
}

export default groupsReducer;
