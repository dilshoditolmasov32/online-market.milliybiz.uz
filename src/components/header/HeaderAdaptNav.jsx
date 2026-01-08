import ChooseLang from "../tools/ChooseLangLight.jsx";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  Accordion,
  Typography,
  Checkbox,
  AccordionSummary,
  Skeleton, 
  Stack,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useCategories from "../../hooks/useCategories";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookF, FaTelegramPlane } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import "./Header.css";

export default function HeaderAdaptNav() {
  // isLoading - loading holatini olish (hookingiz ichida bor deb faraz qilamiz)
  const { categories, isLoading } = useCategories();
  const { t, i18n } = useTranslation();

  const [checkedItems, setCheckedItems] = useState({});
  const [values, setValues] = useState({
    numberformatOne: "1000",
    numberformatTwo: "10000000",
  });
  const contentRef = useRef(null);

  const theme = createTheme({
    typography: { fontFamily: "Neometric" },
  });

  const getNameByLang = (category) => {
    if (!category.translations) return category.name;
    return i18n.language === "ru"
      ? category.translations[0]?.name
      : category.translations[2]?.name;
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        height: "100%",
        position: "relative",
      }}
    >
      <ThemeProvider theme={theme}>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingBottom: "50px",
          }}
          ref={contentRef}
        >
          <h2>{t("categories")}</h2>

          {isLoading ? (
            <Stack spacing={2} sx={{ width: "100%", mt: 2 }}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Box
                  key={item}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    padding: "10px 0",
                    borderBottom: "1px solid #f0f0f0", // Chiziq orqali ajratish
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {/* Matn uchun joy (kulrangroq variant) */}
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={30}
                      animation="wave"
                      sx={{ bgcolor: "#f5f5f5" }}
                    />
                    {/* O'ng tarafdagi icon uchun joy */}
                    <Skeleton
                      variant="circular"
                      width={24}
                      height={24}
                      animation="wave"
                      sx={{ bgcolor: "#f5f5f5" }}
                    />
                  </Box>
                </Box>
              ))}
            </Stack>
          ) : (
            // MA'LUMOT KELGANDA ACCORDION CHIQADI
            categories?.map((category) => (
              <Accordion
                key={category.id}
                disableGutters
                square
                elevation={0}
                sx={accordionSx}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ padding: 0 }}
                >
                  <Typography component="span" sx={typographySx}>
                    {getNameByLang(category)}
                  </Typography>
                </AccordionSummary>

                {category?.translations?.map((el) => (
                  <div className="subcategory-list" key={el.id}>
                    <p>{el.name}</p>
                    <Checkbox
                      checked={!!checkedItems[el.id]}
                      onChange={() =>
                        setCheckedItems({
                          ...checkedItems,
                          [el.id]: !checkedItems[el.id],
                        })
                      }
                      icon={<span className="custom-checkbox-icon" />}
                      checkedIcon={<CheckedIcon />}
                    />
                  </div>
                ))}
              </Accordion>
            ))
          )}
        </div>
      </ThemeProvider>

      {/* Footer qismi o'zgarishsiz qoladi */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "fixed",
          left: "20px",
          right: "20px",
          bottom: "20px", // pastdan joy tashlash uchun
          background: "#fff",
          zIndex: "999",
        }}
      >
        <div className="footer__titles-media">
          <a
            data-social="Instagram"
            style={{ "--accent-color": "#FF0069", background: "#10355B" }}
            href="https://www.instagram.com/"
          >
            <IoLogoInstagram />
          </a>
          <a
            data-social="Facebook"
            style={{ "--accent-color": "#0866FF", background: "#10355B" }}
            href="https://www.facebook.com/"
            target="_blank"
          >
            <FaFacebookF />
          </a>
          <a
            data-social="Telegram"
            style={{ "--accent-color": "#26A5E4", background: "#10355B" }}
            href="https://t.me/@fromMrX"
            target="_blank"
          >
            <FaTelegramPlane />
          </a>
          <a
            data-social="Youtube "
            style={{ "--accent-color": "#FF0000", background: "#10355B" }}
            href="https://www.youtube.com/"
            target="_blank"
          >
            <AiFillYoutube />
          </a>
        </div>
        <ChooseLang />
      </div>
    </div>
  );
}

const CheckedIcon = () => (
  <span className="custom-checkbox-checked">
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M15.5294 0.409577..." fill="black" />
    </svg>
  </span>
);

const accordionSx = {
  background: "none",
  border: "none",
  boxShadow: "none",
  width: "100%",
  "&::before": { display: "none" },
};

const typographySx = {
  color: "#7D7D7D",
  fontSize: { md: "18px", xl: "22px" },
  ".Mui-expanded &": { color: "#000000" },
};
