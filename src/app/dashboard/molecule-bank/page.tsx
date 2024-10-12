import ComponetHeader from "./Header";
import MoleculeBankTable from "./Modeltable";


const Page = () => {
  return (
    <div>
      <ComponetHeader pageName="Molecule Bank" containActionButton={true} />
      <div className="flex flex-col gap-10">
        <MoleculeBankTable />
      </div>
    </div>
  );
};

export default Page;
