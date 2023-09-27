export function Uploader() {
  return (
         <div className="flex justify-center items-center h-screen">
            <div className="w-1/2 p-4 ">
            <div className="mb-4 text-2xl font-bold rounded-lg">
            {"Get started by uploading your file (PNG)"}
            </div>
            <form action="/api/file/" method="post" encType="multipart/form-data">
            <input type="file" name="file" required />
            <button className="ring-2 px-3 py-2 bg-blue-800 text-white rounded-md">
            upload
            </button>
            </form>
            </div>
            </div>
  );
}
