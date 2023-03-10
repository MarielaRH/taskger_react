import { TaskTag } from "../../utils/constants";
import { PropsTags } from "../../utils/interfaces";


export const Tag: React.FC<PropsTags> = ({ tag }) => {
  return (
    <div className="flex justify-start">
      {tag === TaskTag[0] ? (
        <div className="flex justify-between items-center px-2 py-1 bg-secondary-400/10 rounded-[4px]">
          <p className="font-semibold text-sm text-secondary-400">{tag}</p>
        </div>
      ) : null}
      {tag === TaskTag[1] ? (
        <div className="flex justify-between items-center px-2 py-1 bg-primary-400/10 rounded-[4px]">
          <p className="font-semibold text-sm text-primary-400">{tag}</p>
        </div>
      ) : null}
      {tag === TaskTag[2] ? (
        <div className="flex justify-between items-center px-2 py-1 bg-tertiary-400/10 rounded-[4px]">
          <p className="font-semibold text-sm text-tertiary-400">{tag}</p>
        </div>
      ) : null}
      {tag === TaskTag[3] ? (
        <div className="flex justify-between items-center px-2 py-1 bg-neutral-100/10 rounded-[4px]">
          <p className="font-semibold text-sm text-neutral-100">{tag}</p>
        </div>
      ) : null}
      {tag === TaskTag[4] ? (
        <div className="flex justify-between items-center px-2 py-1 bg-deep-purple-400/10 rounded-[4px]">
          <p className="font-semibold text-sm text-purple-400">{tag}</p>
        </div>
      ) : null}
    </div>
  );
};
