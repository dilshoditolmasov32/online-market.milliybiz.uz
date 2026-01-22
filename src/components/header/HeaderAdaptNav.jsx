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

export default function HeaderAdaptNav({ onClose }) {
  const { categories, isLoading } = useCategories();
  const { t, i18n } = useTranslation();

  const [checkedItems, setCheckedItems] = useState({});
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
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <ThemeProvider theme={theme}>
        <div
         style={{
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    paddingBottom: "120px", 
  }}
          ref={contentRef}
        >
          <h2
            style={{
              marginBottom: "30px",
              fontSize: "20px",
              fontWeight: "500",
              color: "#10355B",
            }}
          >
            {t("categories")}
          </h2>

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
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={30}
                      animation="wave"
                      sx={{ bgcolor: "#f5f5f5" }}
                    />
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
                    // onClick={() => onClose()}  

                >
                  <Typography component="span" sx={typographySx}>
                    {getNameByLang(category)}
                  </Typography>
                </AccordionSummary>

                {category?.translations?.map((el) => (
                  <div className="subcategory-list" key={el.id}>
                    <p onClick={onClose}>{el.name}</p>
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

      {/* Footer - doimo pastda turadi */}
      <div className="headerAdaptive-catalog">
        <div className="footer__titles-media">
          <a
            data-social="Instagram"
            style={{ background: "#10355B" }}
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoInstagram color="#fff" size={20} />
          </a>
          <a
            data-social="Facebook"
            style={{ background: "#10355B" }}
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF color="#fff" size={18} />
          </a>
          <a
            data-social="Telegram"
            style={{ background: "#10355B" }}
            href="https://t.me/@fromMrX"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegramPlane color="#fff" size={18} />
          </a>
          <a
            data-social="Youtube"
            style={{ background: "#10355B" }}
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillYoutube color="#fff" size={20} />
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
      <path
        d="M15.5294 0.409577C15.2384 0.118627 14.7635 0.118627 14.4726 0.409577L5.29412 9.58804L1.52941 5.82333C1.23846 5.53238 0.763535 5.53238 0.472585 5.82333C0.181634 6.11428 0.181634 6.5892 0.472585 6.88015L4.76565 11.1732C5.0566 11.4642 5.53152 11.4642 5.82247 11.1732L15.5294 1.46627C15.8204 1.17532 15.8204 0.700527 15.5294 0.409577Z"
        fill="white"
      />
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