// let baseUrl = 'http://localhost:8080/'; //---dev 
let baseUrl = 'https://adwait-website.herokuapp.com/'; //---prod 


export const urls = {
    auth: {
        base: baseUrl+ 'auth',
    },
    account: {
        base: baseUrl + 'account',
        create: baseUrl + 'account/new',
        admin: baseUrl + 'account/admin',
        member: baseUrl + 'account/member',
        user: baseUrl + 'account/user',
    },
    notes: {
        base: baseUrl + 'notes',
        save: baseUrl + 'notes/save',
        update: baseUrl + 'notes/save',
        delete: baseUrl + 'notes/delete',
    },
    contact: {
        base: baseUrl+ 'contact',
        send: baseUrl + 'contact/send',
        getAllContacted: baseUrl + 'contact/filter/contacted',
        getAll: baseUrl + 'contact/getAll',
        delete: baseUrl + 'contact/delete',
    },
    comments: {
        base: baseUrl+ 'comments',
        getById: baseUrl + 'comments',
        getByTopic: baseUrl + 'comments',
        deleteById: baseUrl + 'comments',
        postComment: baseUrl + 'comments',
    }
}