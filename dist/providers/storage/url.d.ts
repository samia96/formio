export default url;
declare function url(formio: any): {
    title: string;
    name: string;
    uploadFile(file: any, name: any, dir: any, progressCallback: any, url: any, options: any, fileKey: any, groupPermissions: any, groupId: any, abortCallback: any): any;
    deleteFile(fileInfo: any): Promise<any>;
    downloadFile(file: any): Promise<any>;
};
declare namespace url {
    const title: string;
}
