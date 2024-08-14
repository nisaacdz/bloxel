import "./Page.css";

const PageNumber = ({ screenData }) => {
  return (
    <h1 id="page-number">{`${screenData.idx + 1} of ${screenData.size}`}</h1>
  );
};

export default PageNumber;