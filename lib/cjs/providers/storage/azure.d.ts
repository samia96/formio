export default azure;
declare function azure(formio: any): {
    uploadFile(file: any, fileName: any, dir: any, progressCallback: any, url: any, options: any, fileKey: any, groupPermissions: any, groupId: any, abortCallback: any): Promise<{
        storage: string;
        name: any;
        size: any;
        type: any;
        groupPermissions: any;
        groupId: any;
        key: any;
    }>;
    downloadFile(file: any): any;
    deleteFile: (fileInfo: any) => any;
};
declare namespace azure {
    const title: string;
}
