
export const reducer = (state, action) => {
    if (action.type === 'USER_MAIL') {
        const split = action.payload.data.split(',')
        state.user.push(...split)
        return { ...state, user: state.user }

    }
    if (action.type === 'CLEAR_USER') {
        state.user = []
        return { user: state.user }

    }

    if (action.type === 'GET_MESSAGE') {
        state.msg = action.data
        return { ...state, msg: state.msg }
    }

    if (action.type === 'CLEAR_MESSAGE') {
        return { ...state, msg: null }
    }

    if (action.type === 'USER') {
        return { ...state, toggle: action.payload }
    }

    return { ...state };
}