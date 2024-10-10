import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { SidebarMenu } from "@/types/opciones_menu";

function AsideOptions({
  sidebarOptions,
  setOpenSidebar,
  sidebarMinimize,
}: {
  sidebarOptions: SidebarMenu[];
  setOpenSidebar: (value: boolean) => void;
  sidebarMinimize: boolean;
}) {
  const pathname = usePathname();

  return (
    <>
      {sidebarOptions.map(({ title, options }, i) => (
        <div key={i} className="mb-6">
          <span className={`${sidebarMinimize ? 'hidden' : 'block'} border-b border-border text-sm pb-2`}>{title}</span>
          {options.map((item, j) => (
            <nav key={j}>
              {item.href && (
                <div>
                  <Link
                    href={item.href}
                    onClick={() => setOpenSidebar(false)}
                    className={`
                    flex items-center 
                    ${sidebarMinimize && "justify-center"} 
                    py-3 gap-3 rounded-lg hover:text-primary font-medium transition-all
                    ${pathname === item.href ? "text-primary" : "text-foreground"}
                    `}>
                    {item.icon}
                    <span className={sidebarMinimize ? "hidden" : "block"}>{item.label}</span>
                  </Link>
                </div>
              )}

              {item.children && (
                <Accordion type="single" collapsible >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex justify-start gap-3">
                        {item.icon}
                        <span className={sidebarMinimize ? "hidden" : "block"}>{item.label}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                      {
                        item.children.map((child, k) => (
                          <Link
                            key={k}
                            href={child.href ? child.href : ''}
                            onClick={() => setOpenSidebar(false)}
                            className={`
                          flex items-center 
                          ${sidebarMinimize? "justify-center" : "pl-6"} 
                          py-3 gap-3 rounded-lg hover:text-primary font-medium transition-all
                          ${pathname === child.href? "text-primary" : "text-foreground"}
                          `}>
                            {child.icon}
                            <span className={sidebarMinimize? "hidden" : "block"}>{child.label}</span>
                          </Link>
                        ))
                      }
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </nav>
          ))}
        </div>
      ))}
    </>
  );
}

export default AsideOptions;
