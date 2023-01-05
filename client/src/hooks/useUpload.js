import { useDispatch } from 'react-redux';
import { handleSingleFileUpload } from '../features/auth-slice';

export function useUpload(file) {
  const dispatch = useDispatch();

  const data = new FormData();
  const filename = Date.now() + file.name;
  data.append('name', filename);
  data.append('file', file);
  dispatch(handleSingleFileUpload(data));
  return filename;
}
