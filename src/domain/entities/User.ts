export class User {
    constructor(

        public id: string,
        public fullname: string,
        public username: string,
        public password: string,
        public email: string,
        public isActive: boolean = true ,
        public role: string = 'user',
    ){}
}
