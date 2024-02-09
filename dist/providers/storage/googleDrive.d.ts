export default googledrive;
declare function googledrive(formio: any): {
    uploadFile(file: any, fileName: any, dir: any, progressCallback: any, url: any, options: any, fileKey: any, groupPermissions: any, groupId: any, abortCallback: any): Promise<any>;
    downloadFile(file: any): Promise<any>;
    deleteFile: (fileInfo: any) => any;
};
declare namespace googledrive {
    const title: string;
}
