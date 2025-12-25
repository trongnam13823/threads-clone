import paths from "@/configs/paths";
import Link from "@/contexts/PageStack/components/Link";

export default function HomePage() {
  console.log("Home Page");
  return (
    <>
      <div className="h-80 w-full shrink-0 bg-gray-200">
        HomePage HomePage HomePage ipsum dolor sit amet consectetur adipisicing elit. Inventore modi quod totam ipsam,
        error suscipit illo unde accusamus aperiam vel iure ex minima repudiandae amet rerum! Incidunt voluptatibus
        reiciendis maiores.
      </div>
      <div className="h-80 w-full shrink-0 bg-gray-200"></div>
      <div className="h-80 w-full shrink-0 bg-gray-200"></div>
      <div className="h-80 w-full shrink-0 bg-gray-200"></div>
      <div className="h-80 w-full shrink-0 bg-gray-200">
        Lorem ipsum dolor sit amet consectetur adipisicing
        <Link to={paths.home} className="text-pink-400">
          To Home
        </Link>
        elit. Inventore modi quod totam ipsam, error suscipit illo unde accusam
        <Link to={paths.following} className="text-pink-400">
          To Following
        </Link>
        us aperiam vel iure ex minima repudiandae amet rerum! Incidunt voluptatibus reiciendis maiores.
      </div>
      <div className="h-80 w-full shrink-0 bg-gray-200"></div>
      <div className="h-80 w-full shrink-0 bg-gray-200">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque asperi
        <Link to={paths.activity} className="text-pink-400">
          To Activity
        </Link>
        ores expedita voluptatibus! Voluptatem quos doloremque, facere animi, amet voluptatibus iure laudantium ipsam
        culpa itaque nemo tempora excepturi minima saepe! Id?
      </div>
      <div className="h-80 w-full shrink-0 bg-gray-200"></div>
    </>
  );
}
