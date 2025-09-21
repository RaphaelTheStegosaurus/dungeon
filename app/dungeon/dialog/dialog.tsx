interface Props {}
import Style from "./dialog.module.css";
const Dialog = (props: Props) => {
  return (
    <div className={`${Style.BoxDialog}`}>
      <h2 className={`${Style.Character}`}>-Personaje-</h2>
      <p className={`${Style.Text}`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit quis magni, necessitatibus ducimus debitis numquam, iusto aliquam quae commodi nihil optio perferendis blanditiis enim officia? Error explicabo harum cupiditate consectetur?
      </p>
    </div>
  );
};
export default Dialog;
