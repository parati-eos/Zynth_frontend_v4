import Financials from "./financial";
import "./sectionForm.css";
import Team from "./team";
import Testimonials from "./testimonials";
import TrackRecord from "./trackRecord";
import { useState } from "react";

function SectionForm({ Title, onClose }) {
  const [section, setSection] = useState(Title);
  const [formData, setFormData] = useState({
    userId: "userEmail",
    companyName: "",
    tagline: "",
    logo: null,
    primaryColor: "#000000",
    secondaryColor: "#000000",
    establishmentYear: "",
    companyOverview: "",
    problemDescription: "",
    solutionsDescription: "",
    sector: "",
    otherSector: "",
    marketDescription: "",
    TAM: "",
    TAMGrowthRate: "",
    SAM: "",
    SAMGrowthRate: "",
    productOverview: "",
    productRoadmap: "",
    productRoadmapDescription: "",
    technicalArchitecture: "",
    appType: "",
    mobileScreenshots: [],
    webScreenshots: [],
    businessModel: "",
    keyStakeholders: "",
    customerPersona: "",
    goToMarketStrategy: "",
    trackRecord: [],
    caseStudies: "",
    testimonials: [],
    competitors: [],
    competitiveDiff: "",
    teamMembers: [],
    // Add contact information fields
    websiteLink: "",
    linkedinLink: "",
    contactEmail: "",
    contactPhone: "",
    // Add financial information fields
    financialSnapshot: "",
    revenueCost: [],
    plannedRaise: "",
    useOfFunds: [],
    percentage: "",
  });
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let newValue = value;

    if (name === "primaryColor" || name === "secondaryColor") {
      newValue = value === "" ? "#000000" : value;
    }

    if (files && files.length > 0) {
      newValue = files[0];
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    if (
      name === "logo" ||
      name === "mobileScreenshots" ||
      name === "webScreenshots"
    ) {
      setIsUploadComplete(files && files.length > 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formId = localStorage.getItem("submissionId");
    const generatedPresentationId = localStorage.getItem(
      "generatedPresentationId"
    );

    const sectionMapping = {
      Cover: "about",
      About: "companyDetails",
      "Problem Areas": "problemDescription",
      Solution: "solutionDescription",
      "Market Sizing": "market",
      "Product Overview": "product",
      "Product Roadmap": "productRoadmap",
      "System Architecture": "systemArchitecture",
      "Mobile App Screenshots": "mobileAppScreenshots",
      "Web App Screenshots": "webAppScreenshots",
      "Business Model": "businessModel",
      "Key Stakeholders": "keyStakeholders",
      "Customer Persona": "customerPersona",
      "Go-to-market Strategy": "goToMarketStrategy",
      "Track Record": "trackRecord",
      "Case Study": "caseStudies",
      Testimonials: "testimonials",
      "Competitive Landscape": "competition",
      "Competitive Differentiation": "competitiveDiff",
      "Founding Team": "teamMembers",
      "Financial Overview": "financialInfo",
      "Contact Us": "contact",
    };

    const payload = {
      formId: formId,
      formResponses: formData,
      section: sectionMapping[section],
      generatedPresentationId: generatedPresentationId,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/submission/section-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="sectionForm-Container">
        <h2>{Title}</h2>
        <div className="sectionForm-Content h-[60vh] w-[70vh] bg-white">
          {(() => {
            if (Title === "Track Record") {
              return <TrackRecord formData={formData} />;
            } else if (Title === "Founding Team") {
              return <Team formData={formData} />;
            } else if (Title === "Financial Overview") {
              return <Financials formData={formData} />;
            } else if (Title === "Testimonials") {
              return (
                <Testimonials formData={formData} handleChange={handleChange} />
              );
            }
          })()}
        </div>
        <div className="section-form-buttons">
          <button className="" onClick={onClose}>
            Close
          </button>
          <button type="submit" className="">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default SectionForm;
