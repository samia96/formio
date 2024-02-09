export default s3;
declare function s3(formio: any): {
    uploadFile(file: any, fileName: any, dir: any, progressCallback: any, url: any, options: any, fileKey: any, groupPermissions: any, groupId: any, abortCallback: any, multipartOptions: any): Promise<{
        storage: string;
        name: any;
        bucket: any;
        key: any;
        url: any;
        acl: any;
        size: any;
        type: any;
    }>;
    completeMultipartUpload(serverResponse: any, parts: any, multipart: any): Promise<void>;
    abortMultipartUpload(serverResponse: any): void;
    uploadParts(file: any, urls: any, headers: any, partSize: any, multipart: any, abortSignal: any): Promise<any[]>;
    downloadFile(file: any): any;
    deleteFile(fileInfo: any): any;
};
declare namespace s3 {
    const title: string;
}
