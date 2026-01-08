import { useRef, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  Accordion,
  Typography,
  Checkbox,
  AccordionSummary,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NumericFormat } from "react-number-format";
import { useTranslation } from "react-i18next"; 
import useCategories from "../../hooks/useCategories";

export default function CategoryDropdown() {
  const { categories } = useCategories();
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
        ))}

        <div className="price-sort">
          <div className="price-container">
            <NumericFormat
              customInput={TextField}
              placeholder={t("от")}
              onChange={handleChange}
              name="numberformatOne"
              sx={inputSx}
              InputProps={{ disableUnderline: true }}
            />
            <NumericFormat
              customInput={TextField}
              placeholder={t("до")}
              onChange={handleChange}
              name="numberformatTwo"
              sx={inputSx}
              InputProps={{ disableUnderline: true }}
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
      <path d="M15.5294 0.409577..." fill="black" />
    </svg>
  </span>
);

const accordionSx = {
  background: "none",
  border: "none",
  boxShadow: "none",
  width: { md: "350px", xs:"300px" },
  "&::before": { display: "none" },
};

const typographySx = {
  color: "#7D7D7D",
  fontSize: { md: "18px", xl: "22px" },
  ".Mui-expanded &": { color: "#000000" },
};

const inputSx = {
  width:"170px",
  backgroundColor: "#FFFFFF",
  border: "1px solid #B9B9B9",
  borderRadius: "10px",
  outline:"none",
  "& .MuiInputBase-input": { padding: "14px 20px" },
};
