import { useRef, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  Accordion,
  Typography,
  Checkbox,
  AccordionSummary,
  TextField,
  AccordionDetails // Bu muhim
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NumericFormat } from "react-number-format";
import { useTranslation } from "react-i18next"; 
import useCategories from "../../hooks/useCategories";

const theme = createTheme({
  typography: { fontFamily: "Neometric" },
});

export default function CategoryDropdown() {
  const { categories } = useCategories();
  const { t, i18n } = useTranslation(); 

  const [checkedItems, setCheckedItems] = useState({});
  const [expanded, setExpanded] = useState(false);  

  const handleAccordionToggle = (panelId) => (_, isExpanded) => {
    setExpanded(isExpanded ? panelId : false);
  };

  const handleCheckboxChange = (id) => {
    console.log("Tanlangan ID:", id);
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    // Tanlanganda yopish
    setExpanded(false);
  };

  const [values, setValues] = useState({
    numberformatOne: "1000",
    numberformatTwo: "10000000",
  });
  const contentRef = useRef(null);

  const getNameByLang = (category) => {
    if (!category.translations) return category.name;
    return i18n.language === "ru"
      ? category.translations[0]?.name
      : category.translations[2]?.name;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="accordion-menu" ref={contentRef}>
        {categories?.map((category) => (
          <Accordion
            key={category.id}
            disableGutters
            square
            elevation={0}
            sx={accordionSx}
            expanded={expanded === category.id}
            onChange={handleAccordionToggle(category.id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ padding: 0 }}
            >
              <Typography component="span" sx={typographySx}>
                {getNameByLang(category)}
              </Typography>
            </AccordionSummary>

            {/* Kontentni AccordionDetails ichiga olish shart */}
            <AccordionDetails sx={{ padding: 0 }}>
              {category?.translations?.map((el) => (
                <div className="subcategory-list" key={el.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p>{el.name}</p>
                  <Checkbox
                    checked={!!checkedItems[el.id]}
                    onChange={() => handleCheckboxChange(el.id)}
                    icon={<span className="custom-checkbox-icon" />}
                    checkedIcon={<CheckedIcon />}
                  />
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}

        <div className="price-sort">
          <div className="price-container" style={{ display: 'flex', gap: '10px' }}>
            <NumericFormat
              customInput={TextField}
              placeholder={t("от")}
              onChange={handleChange}
              name="numberformatOne"
              sx={inputSx}
              variant="standard"
              slotProps={{
                input: {
                  disableUnderline: true,
                },
              }}
            />
            <NumericFormat
              customInput={TextField}
              placeholder={t("до")}
              onChange={handleChange}
              name="numberformatTwo"
              sx={inputSx}
              variant="standard"
              slotProps={{
                input: {
                  disableUnderline: true,
                },
              }}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

const CheckedIcon = () => (
  <span className="custom-checkbox-checked">
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M1 6L6 11L15 1" stroke="black" strokeWidth="2" fill="none" />
    </svg>
  </span>
);

const accordionSx = {
  background: "none",
  border: "none",
  boxShadow: "none",
  width: { md: "350px", xs: "100%" },
  "&::before": { display: "none" },
};

const typographySx = {
  color: "#7D7D7D",
  fontSize: { md: "18px", xl: "22px" },
  ".Mui-expanded &": { color: "#000000" },
};

const inputSx = {
  width: "170px",
  backgroundColor: "#FFFFFF",
  border: "1px solid #B9B9B9",
  borderRadius: "10px",
  "& .MuiInputBase-input": { padding: "14px 20px" },
};