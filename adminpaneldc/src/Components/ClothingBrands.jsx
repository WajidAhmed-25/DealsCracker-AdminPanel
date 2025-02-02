import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const localUrl = "http://localhost:8000/api/v1";

const ClothingBrands = () => {
  const [foodBrands, setFoodBrands] = useState([]);
  const [trendingBrands, setTrendingBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFoodBrands();
    fetchTrendingBrands();
  }, []);

  const fetchFoodBrands = async () => {
    try {
      const response = await axios.get(`${localUrl}/clothingAndFood/getAllBrands?category=clothing`);
      setFoodBrands(response.data.clothingBrands || []);
    } catch (err) {
      console.error("Error fetching food brands:", err);
      setError("Failed to load food brand data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingBrands = async () => {
    try {
      const response = await axios.get(`${localUrl}/clothingAndFood/getTopTrendingBrands?category=clothing`);
      const filteredTrendingBrands = response.data.filter((brand) => brand.avg_discount > 0);
      setTrendingBrands(filteredTrendingBrands || []);
    } catch (err) {
      console.error("Error fetching top trending clothing brands:", err);
      setError("Failed to load trending clothing brand data.");
    } finally {
      setLoading(false);
    }
  };

  const foodChartOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: true
      },
      animations: {
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        barHeight: '70%',
        dataLabels: {
          position: 'center'
        }
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        fontWeight: 600
      },
      offsetX: 30
    },
    xaxis: {
      categories: foodBrands.map((brand) => brand.brand_name),
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    responsive: [{
      breakpoint: 640,
      options: {
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          offsetX: 0
        }
      }
    }]
  };

  const foodChartSeries = [{
    name: "Product Count",
    data: foodBrands.map((brand) => brand.products_count)
  }];

  const trendingChartOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: true
      },
      animations: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: ['#00B5E2'],
    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        size: 8
      }
    },
    xaxis: {
      categories: trendingBrands.map((brand) => brand.brand_name),
      labels: {
        style: {
          fontSize: '12px'
        },
        rotate: -45
      }
    },
    yaxis: {
      title: {
        text: "Average Discount (%)"
      },
      labels: {
        formatter: (value) => `${value}%`
      },
      min: Math.floor(Math.min(...trendingBrands.map(brand => brand.avg_discount)) - 5),
      max: Math.ceil(Math.max(...trendingBrands.map(brand => brand.avg_discount)) + 5)
    },
    dataLabels: {
      enabled: true,
      formatter: (value) => `${value}%`,
      offsetY: -10,
      style: {
        fontSize: '12px',
        fontWeight: 600
      }
    },
    grid: {
      padding: {
        top: 20
      }
    },
    responsive: [{
      breakpoint: 640,
      options: {
        chart: {
          height: 300
        },
        markers: {
          size: 4,
          hover: {
            size: 6
          }
        }
      }
    }]
  };

  const trendingChartSeries = [{
    name: "Average Discount",
    data: trendingBrands.map((brand) => brand.avg_discount)
  }];

  return (
    <div className="p-4 md:p-8">
      {/* Clothing Brands Product Chart */}
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Clothing Brands</h2>
      <div className="bg-white rounded-lg shadow-md p-3 md:p-6 mb-6 md:mb-10">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Clothing Brands Products</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : foodBrands.length > 0 ? (
          <div className="min-h-[300px] md:min-h-[400px]">
            <Chart 
              options={foodChartOptions} 
              series={foodChartSeries} 
              type="bar" 
              height="100%"
            />
          </div>
        ) : (
          <p className="text-center text-gray-500">No data available.</p>
        )}
      </div>

      {/* Top Trending Clothing Brands Chart */}
      <div className="bg-white rounded-lg shadow-md p-3 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Top Trending Clothing Brands</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : trendingBrands.length > 0 ? (
          <div className="min-h-[300px] md:min-h-[400px]">
            <Chart 
              options={trendingChartOptions} 
              series={trendingChartSeries} 
              type="line" 
              height="100%"
            />
          </div>
        ) : (
          <p className="text-center text-gray-500">No trending clothing brands available.</p>
        )}
      </div>
    </div>
  );
};

export default ClothingBrands;