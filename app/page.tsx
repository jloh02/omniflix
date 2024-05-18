import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Button variant="contained">
          <AddCircleIcon />
          <p style={{ marginLeft: "10px" }}>
            Test Material Button that does nth
          </p>
        </Button>
      </div>
    </div>
  );
}
