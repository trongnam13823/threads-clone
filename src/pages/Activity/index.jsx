import paths from "@/configs/paths";
import Link from "@/contexts/pageStack/components/Link";

const ActivityPage = () => {
  return (
    <>
      <div className="h-80 w-full shrink-0">
        ActivityPage ActivityPage ActivityPage ipsum dolor sit amet consectetur adipisicing elit. Inventore modi quod
        totam ipsam, error suscipit illo unde accusamus aperiam vel iure ex minima repudiandae amet rerum! Incidunt
        voluptatibus reiciendis maiores.
      </div>
      <div className="h-80 w-full shrink-0"></div>
      <div className="h-80 w-full shrink-0"></div>
      <div className="h-80 w-full shrink-0"></div>
      <div className="h-80 w-full shrink-0">
        Lorem ipsum dolor sit amet consecteLorem ipsum dolor sit amet consectetur adipisicing elit. Eaque asperi
        <Link to={paths.activityFollows} className="text-pink-400">
          To Activity Follows
        </Link>
        ores expedita voluptatibus! Voluptatem quos doloremque, facere animi, amet voluptatibus iure laudantium ipsam
        culpa itaque nemo tempora excepturi minima saepe! Id?tur adipisicing elit. Inventore modi quod totam ipsam,
        error suscipit illo unde accusamus aperiam vel iure ex minima repudiandae amet rerum! Incidunt voluptatibus
        reiciendis maiores.
      </div>
      <div className="h-80 w-full shrink-0"></div>
      <div className="h-80 w-full shrink-0"></div>
      <div className="h-80 w-full shrink-0"></div>
    </>
  );
};

export default ActivityPage;
