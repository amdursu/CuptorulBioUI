import { Menubar } from "primereact/menubar";
import { useRouter } from "next/router";
import styles from "./NavBar.module.scss";

const NavBar = ({ children }: any) => {
  const router = useRouter();
  const items = [
    {
      label: "Depozit",
      icon: "pi pi-fw pi-inbox",
      command: () => {
        router.push("/stocks");
      },
    },
  ];
  return (
    <div className={styles.navbar}>
      <Menubar className={styles.menubar} model={items} />
      <main>{children}</main>
    </div>
  );
};

export default NavBar;
