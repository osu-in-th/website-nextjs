"use client";
import clsx from 'clsx'
import React from 'react'
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link } from '@heroui/react'
import { useLanguage } from '@/contexts/languageContext'
import { usePathname } from 'next/navigation';
import { GithubLogoIcon } from '@phosphor-icons/react/dist/ssr';
import { languages } from '@/utils/i18n';

function Header() {
  const { language, setLanguageByKey } = useLanguage();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
      window.document.documentElement.setAttribute("data-scroll", isScrolled ? "true" : "false");
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <header className={clsx(
        'w-full fixed flex items-center justify-center gap-4 rounded-b-2xl z-50 apply-transition',
        scrolled ? "bg-secondary p-2" : "bg-transparent p-4"
      )}>
        <div className='w-full max-w-4xl flex items-center justify-between gap-4'>
          <div className={clsx(
            'relative apply-transition',
            scrolled ? "h-12 w-12" : "h-16 w-16"
          )} id='logo'>
            <Link className='group active:opacity-100' href='/' tabIndex={-1}>
              <svg className='h-full w-full select-none apply-transition group-hover:scale-110 rounded-full focus-visible' tabIndex={0} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Layer_1" data-name="Layer 1" viewBox="0 0 1080 1080">
                <defs>
                  <linearGradient xmlns="http://www.w3.org/2000/svg" id="linear-gradient" x1="70.48779296875" y1="539.999755859375" x2="1009.51171875" y2="539.999755859375" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffbfd4"/>
                    <stop offset="1" stopColor="#ff7fa6"/>
                  </linearGradient>
                  <clipPath xmlns="http://www.w3.org/2000/svg" id="clippath">
                    <circle cx="540.000000000000227" cy="539.999999999999091" r="454.666666666597052" fill="none"/>
                  </clipPath>
                </defs>
                <g xmlns="http://www.w3.org/2000/svg">
                  <path className='opacity-0 group-hover:opacity-100 apply-transition' d="M540,1009.51171875c-63.39794921875,0-124.88232421875-12.4091796875-182.74560546875-36.8837890625-55.9052734375-23.6455078125-106.1201171875-57.5029296875-149.24951171875-100.6328125-43.1298828125-43.1298828125-76.98779296875-93.3447265625-100.6337890625-149.25-24.47412109375-57.8623046875-36.88330078125-119.34765625-36.88330078125-182.7451171875,0-63.39794921875,12.4091796875-124.88232421875,36.88330078125-182.74560546875,23.64599609375-55.9052734375,57.50390625-106.1201171875,100.6337890625-149.24951171875,43.12939453125-43.1298828125,93.34423828125-76.98779296875,149.24951171875-100.6337890625,57.86328125-24.47412109375,119.34765625-36.88330078125,182.74560546875-36.88330078125,63.3974609375,0,124.8828125,12.4091796875,182.7451171875,36.88330078125,55.9052734375,23.64599609375,106.1201171875,57.50390625,149.25,100.6337890625,43.1298828125,43.12939453125,76.9873046875,93.34423828125,100.6328125,149.24951171875,24.474609375,57.86328125,36.8837890625,119.34765625,36.8837890625,182.74560546875,0,63.3974609375-12.4091796875,124.8828125-36.8837890625,182.7451171875-23.6455078125,55.9052734375-57.5029296875,106.1201171875-100.6328125,149.25s-93.3447265625,76.9873046875-149.25,100.6328125c-57.8623046875,24.474609375-119.34765625,36.8837890625-182.7451171875,36.8837890625Z" fill="url(#linear-gradient)"/>
                  <path d="M540,102.487777709960938c59.0919189453125,0,116.38250732421875,11.558891296386719,170.27972412109375,34.355560302734375,52.09112548828125,22.03277587890625,98.88720703125,53.5877685546875,139.08807373046875,93.78887939453125,40.20111083984375,40.200851440429688,71.756103515625,86.996963500976562,93.78887939453125,139.088058471679688,22.796630859375,53.897216796875,34.35552978515625,111.187774658203125,34.35552978515625,170.27972412109375,0,59.0919189453125-11.55889892578125,116.38250732421875-34.35552978515625,170.27972412109375-22.03277587890625,52.09112548828125-53.5877685546875,98.88720703125-93.78887939453125,139.08807373046875-40.20086669921875,40.20111083984375-86.9969482421875,71.756103515625-139.08807373046875,93.78887939453125-53.897216796875,22.796630859375-111.18780517578125,34.35552978515625-170.27972412109375,34.35552978515625-59.091949462890625,0-116.38250732421875-11.55889892578125-170.27972412109375-34.35552978515625-52.091094970703125-22.03277587890625-98.88720703125-53.5877685546875-139.088058471679688-93.78887939453125-40.20111083984375-40.20086669921875-71.756103515625-86.9969482421875-93.78887939453125-139.08807373046875-22.796669006347656-53.897216796875-34.355560302734375-111.18780517578125-34.355560302734375-170.27972412109375,0-59.091949462890625,11.558891296386719-116.38250732421875,34.355560302734375-170.27972412109375,22.03277587890625-52.091094970703125,53.5877685546875-98.88720703125,93.78887939453125-139.088058471679688,40.200851440429688-40.20111083984375,86.996963500976562-71.756103515625,139.088058471679688-93.78887939453125,53.897216796875-22.796669006347656,111.187774658203125-34.355560302734375,170.27972412109375-34.355560302734375M540,38.487777709960938c-276.977508544921875,0-501.512222290039062,224.534713745117188-501.512222290039062,501.512222290039062,0,276.97747802734375,224.534713745117188,501.51220703125,501.512222290039062,501.51220703125,276.97747802734375,0,501.51220703125-224.53472900390625,501.51220703125-501.51220703125,0-276.977508544921875-224.53472900390625-501.512222290039062-501.51220703125-501.512222290039062h0Z" fill="#fff"/>
                </g>
                <g id="Layer_3" data-name="Layer 3">
                  <g xmlns="http://www.w3.org/2000/svg" clipPath="url(#clippath)">
                    <g opacity=".1">
                      <polygon points="784.707317073174636 689.633876830939698 889.491767181978503 874.266897165072805 996.996428114383889 1057.329403047941014 784.707317073174636 1055.758888596690667 572.418206031965383 1057.329403047941014 679.922866964372588 874.266897165074624 784.707317073174636 689.633876830939698" fill="#fff"/>
                    </g>
                    <g opacity=".1">
                      <polygon points="232.707317073173726 500.300543497605759 337.491767181977593 684.933563831738866 444.996428114382979 867.996069714610712 232.707317073173726 866.42555526335309 20.418206031964473 867.996069714610712 127.922866964371678 684.933563831740685 232.707317073173726 500.300543497605759" fill="#fff"/>
                    </g>
                    <g opacity=".1">
                      <polygon points="766.1455078125 38.487804878048337 870.929957921303867 223.120825212181444 978.434618853709253 406.18333109505329 766.1455078125 404.612816643795668 553.856396771290747 406.18333109505329 661.361057703697952 223.120825212183263 766.1455078125 38.487804878048337" fill="#fff"/>
                    </g>
                    <g opacity=".1">
                      <polygon points="1002.29365596064963 208.773574782123433 1107.078106069449859 393.406595116257449 1214.582767001860702 576.469100999127477 1002.29365596064963 574.898586547869854 790.004544919438558 576.469100999127477 897.509205851845763 393.406595116257449 1002.29365596064963 208.773574782123433" fill="#fff"/>
                    </g>
                    <g opacity=".1">
                      <polygon points="510.201220404716878 353.494006838347559 552.0375799032754 427.210797888766137 594.960013889127367 500.300543541584375 510.201220404716878 499.673498143986762 425.442426920306389 500.300543541584375 468.364860906158356 427.210797888766137 510.201220404716878 353.494006838347559" fill="#fff"/>
                    </g>
                    <g opacity=".1">
                      <polygon points="340.683633435895899 814.82734017167968 382.519992934454422 888.544131222099168 425.442426920306389 961.633876874917405 340.683633435895899 961.006831477319793 255.92483995148541 961.633876874917405 298.847273937337377 888.544131222099168 340.683633435895899 814.82734017167968" fill="#fff"/>
                    </g>
                    <g opacity=".1">
                      <polygon points="699.948523588765966 632.904104695257047 741.784883087322669 706.620895745676535 784.707317073174636 779.710641398494772 699.948523588765966 779.08359600089716 615.189730104353657 779.710641398494772 658.112164090205624 706.620895745676535 699.948523588765966 632.904104695257047" fill="#fff"/>
                    </g>
                    <g opacity=".1">
                      <polygon points="159.948523589143406 259.376794318322936 201.7848830876992 333.093585368742424 244.707317073551167 406.183331021560662 159.948523589143406 405.556285623963049 75.189730104730188 406.183331021560662 118.112164090582155 333.093585368742424 159.948523589143406 259.376794318322936" fill="#fff"/>
                    </g>
                    <g opacity=".1">
                      <polygon points="917.534862476237322 551.850637898380228 959.371221974794025 625.567428948799716 1002.29365596064963 698.657174601617953 917.534862476237322 698.030129204020341 832.776068991825014 698.657174601617953 875.698502977676981 625.567428948799716 917.534862476237322 551.850637898380228" fill="#fff"/>
                    </g>
                    <g opacity=".1">
                      <polygon points="297.912109375 -123.378662109374091 402.696559483803867 61.254358224759926 510.201220416209253 244.316864107629954 297.912109375 242.746349656372331 85.622998333790747 244.316864107629954 193.127659266197952 61.254358224759926 297.912109375 -123.378662109374091" fill="#fff"/>
                    </g>
                  </g>
                </g>
                <text xmlns="http://www.w3.org/2000/svg" transform="translate(289.40234375 617.280021667480469)" fill="#fff" fontFamily="NotoSansThai-ExtraBold, 'Noto Sans Thai'" fontSize="270.191162109375" font-variation-settings="'wght' 800, 'wdth' 100" fontWeight="700"><tspan x="0" y="0">{language.data.site.osu}</tspan></text>
              </svg>
            </Link>
          </div>
          <nav className='flex-1 flex items-center justify-between gap-4'>
            <div className='flex items-center gap-2'>
              <NavLink href='/'>{language.data.pages.home.title}</NavLink>
              <NavLink href='/beatmapsets'>{language.data.pages.beatmap.title}</NavLink>
              <NavLink href='https://status.osu.in.th' target='_blank'>{language.data.pages.status.title}</NavLink>
            </div>
            <div className='flex items-center gap-4'>
              <Link href='https://github.com/osu-in-th' target='_blank' tabIndex={-1}><Button isIconOnly variant='light' radius='full'><GithubLogoIcon weight='fill' size={18} /></Button></Link>
              <Dropdown>
                <DropdownTrigger>
                  <Button className="capitalize" radius='full' variant="light" isIconOnly><Avatar alt={language.name} className="w-6 h-6" src={`https://flagcdn.com/${language.flag}.svg`} /></Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  selectedKeys={language.key}
                  selectionMode="single"
                  variant="flat"
                  onSelectionChange={keys => {
                    const value = keys.currentKey;
                    if (value) setLanguageByKey(value);
                  }}
                >
                {
                  languages.map((lang, index) => {
                    return <DropdownItem value={lang.key} key={index}
                      classNames={{
                        title: "font-semibold"
                      }}
                      startContent={
                        <Avatar alt={lang.name} className="w-5 h-5" src={`https://flagcdn.com/${lang.flag}.svg`} />
                      }>{lang.localName}</DropdownItem>
                  })
                }
                </DropdownMenu>
              </Dropdown>
              <Button href='/my-profile' isIconOnly radius='full' className={clsx(
                'relative apply-transition',
                scrolled ? "h-10 w-10" : "h-14 w-14"
              )}>
                <Avatar src="https://static.osu.in.th/images/default-userprofile.png" className={clsx(
                  'relative apply-transition select-none pointer-events-none',
                  scrolled ? "h-10 w-10" : "h-14 w-14"
                )} />
              </Button>
            </div>
          </nav>
        </div>
      </header>
      <div className='h-24' />
    </>
  )
}

export function NavLink({href, target, className, children}: {href: string, target?: string, className?: string, children: React.ReactNode}) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return <Link href={href} target={target} className={clsx("border-2 border-transparent p-1 font-bold text-white text-sm rounded-sm", isActive ? "active border-b-primary" : "", className)}>{children}</Link>
}

export default Header