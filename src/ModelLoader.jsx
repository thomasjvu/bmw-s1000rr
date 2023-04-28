import { Html, useProgress } from "@react-three/drei";

function ModelLoader() {
    const { progress } = useProgress();
    return <Html className="text-center" center>Loading: {progress.toFixed(2)}%</Html>;
}

export default ModelLoader
