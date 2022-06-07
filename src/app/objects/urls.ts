let baseUrl = 'http://localhost:8080/'; //---dev 
// let baseUrl = 'http://adwait.in/'; //---prod 


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
    }
}