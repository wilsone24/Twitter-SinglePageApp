import { useFeatureIsOn } from "@growthbook/growthbook-react";

function MyComponent() {
  const enabled = useFeatureIsOn("show-new-button");
  
  if (enabled) {
    return <div><button>Feature Flag Activo</button></div>
  } else {
    console.log(enabled);
    return <div><a href="#">Feature Flag Inactivo</a></div>
  }
}

export default MyComponent;