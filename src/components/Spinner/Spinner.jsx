import { TailSpin } from "react-loader-spinner";

export default function Spinner({ isLoading }) {
  return (
    <div>
      <TailSpin
        height="40"
        width="40"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        visible={isLoading}
      />
    </div>
  );
}
