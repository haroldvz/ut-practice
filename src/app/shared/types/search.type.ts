import { usersDescriptor } from "./user.type";

export class searchDescriptor{

    public total_count: number;
    public incomplete_results: boolean;
    public items: usersDescriptor[] = [];

    /**
     *
     *
     * @static
     * @param {*} rawData
     * @returns
     * @memberof searchDescriptor
     */
    public static import(rawData: any) {
        let search: searchDescriptor = new searchDescriptor();
        search.total_count = rawData.hasOwnProperty('total_count') ? rawData.total_count : 0;
        search.incomplete_results = rawData.hasOwnProperty('incomplete_results') ? rawData.incomplete_results : '';
       
        let user: usersDescriptor;
        if (rawData.hasOwnProperty("items")) {
            for (var i = 0; i < rawData.items.length; i++) {
                let row: any = rawData.items[i];
                user = usersDescriptor.import(row);
                search.items.push(user);
            }
        }
        return search;
    }
}