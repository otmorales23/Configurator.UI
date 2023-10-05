import { Home } from "./components/Home";
import { FileUpload } from "./components/FileUpload";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/FileUpload',
    element: <FileUpload />
  }
];

export default AppRoutes;
