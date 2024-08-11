import "./Page.css";

const PageNumber = ({ screenData }) => {
  return (
    <p id="page-number">{`${screenData.idx + 1} of ${screenData.size}`}</p>
  );
};

export default PageNumber;
