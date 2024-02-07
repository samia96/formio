export default base64;
declare function base64(): {
    title: string;
    name: string;
    uploadFile(file: any, fileName: any): Promise<any>;
    downloadFile(file: any): Promise<any>;
};
declare namespace base64 {
    const title: string;
}
