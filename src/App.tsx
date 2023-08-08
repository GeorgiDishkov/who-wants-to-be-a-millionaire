import { Route, Routes } from "react-router-dom";
import StartGame from "./pages/StartGame";
import InGame from "./pages/InGame";
import EndGame from "./pages/EndGame";

function App() {
  // const state = useSelector((state: RootState) => state)
  // const dispatch:ThunkDispatch<RootState , undefined, AnyAction> = useDispatch();

  // useEffect(() => {
  //   (async() => {
  //     await dispatch(asyncQuestions({count:5 , difficulty:"hard"}))
  //   })()
  // },[])
  // console.log(state);

  return (
    <Routes>
      <Route path="/" element={<StartGame />} />
      <Route path="/in-game" element={<InGame />} />
      <Route path="/end-game" element={<EndGame />} />
    </Routes>
  );
}

export default App;
