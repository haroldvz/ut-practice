export class usersDescriptor {

    public id: number;
    public login: string;
    public url: string;
    public type: string;
    public avatar_url: string;

    /**
     *
     *
     * @static
     * @param {*} rawData
     * @returns
     * @memberof usersDescriptor
     */
    public static import(rawData: any) {
        let user: usersDescriptor = new usersDescriptor();
        user.id = rawData.hasOwnProperty('id') ? rawData.id : 0;
        user.login = rawData.hasOwnProperty('login') ? rawData.login : '';
        user.url = rawData.hasOwnProperty('url') ? rawData.url : '';
        user.type = rawData.hasOwnProperty('type') ? rawData.type : '';
        user.avatar_url = rawData.hasOwnProperty('avatar_url') ? rawData.avatar_url : '';
        return user;
    }
}

