export default indexeddb;
declare function indexeddb(): {
    title: string;
    name: string;
    uploadFile(file: any, fileName: any, dir: any, progressCallback: any, url: any, options: any): Promise<any> | undefined;
    downloadFile(file: any, options: any): Promise<any>;
    deleteFile(file: any, options: any): Promise<any>;
};
declare namespace indexeddb {
    const title: string;
}
