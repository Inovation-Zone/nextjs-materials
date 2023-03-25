import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { FILE_API } from '@/constants/api';

const useUploadFiles = () => {
  const uploadFiles = async (formData: FormData) => {
    const result = await httpRequest({
      method: 'POST',
      data: formData,
      url: FILE_API.uploadFiles.api,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return result?.data?.items;
  };

  return useMutation(uploadFiles);
};

export default useUploadFiles;
