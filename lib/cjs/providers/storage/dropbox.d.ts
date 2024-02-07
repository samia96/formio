export default dropbox;
declare function dropbox(formio: any): {
    uploadFile(file: any, fileName: any, dir: any, progressCallback: any, url: any, options: any, fileKey: any, groupPermissions: any, groupId: any, abortCallback: any): Promise<any>;
    downloadFile(file: any): Promise<any>;
};
declare namespace dropbox {
    const title: string;
}
